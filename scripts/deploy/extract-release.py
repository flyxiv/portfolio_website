#!/usr/bin/env python3
"""Validate untrusted archive names/links/sizes before extracting a release."""
from pathlib import Path, PurePosixPath
import os
import shutil
import sys
import tarfile


def extract(archive: Path, destination: Path) -> None:
    with tarfile.open(archive, 'r:gz') as bundle:
        members = bundle.getmembers()
        if len(members) > 50000 or sum(m.size for m in members) > 750 * 1024 * 1024:
            raise ValueError('Release exceeds unpacked size/file limit')
        for member in members:
            name = PurePosixPath(member.name)
            if name.is_absolute() or '..' in name.parts:
                raise ValueError('Unsafe archive path')
            if not (member.isfile() or member.isdir() or member.issym()):
                raise ValueError('Unsupported archive member type')
            if member.issym():
                target = PurePosixPath(member.linkname)
                if target.is_absolute() or '..' in target.parts:
                    raise ValueError('Unsafe archive symlink')
        # Do not use extractall: the VM's Python predates tarfile's data filter.
        # Ignore archive ownership and special permissions; never follow a file symlink.
        root = destination.resolve()
        for member in members:
            output = destination / member.name
            if not output.resolve().is_relative_to(root):
                raise ValueError('Archive path resolves outside release')
            output.parent.mkdir(parents=True, exist_ok=True)
            if member.isdir():
                output.mkdir(exist_ok=True)
            elif member.issym():
                if not (output.parent / member.linkname).resolve().is_relative_to(root):
                    raise ValueError('Archive link resolves outside release')
                output.symlink_to(member.linkname)
            else:
                flags = os.O_CREAT | os.O_EXCL | os.O_WRONLY | os.O_NOFOLLOW
                with os.fdopen(os.open(output, flags, 0o600), 'wb') as target:
                    with bundle.extractfile(member) as source:
                        shutil.copyfileobj(source, target)
                output.chmod(0o755 if member.mode & 0o111 else 0o644)
    required = ['node', 'server.js', 'start.sh', '.next/BUILD_ID', 'public/deployment-revision.txt']
    if not all((destination / name).is_file() for name in required):
        raise ValueError('Incomplete standalone release')


if __name__ == '__main__':
    extract(Path(sys.argv[1]), Path(sys.argv[2]))
