#!/usr/bin/env python3
"""Small security regression tests for the deployment archive boundary."""
import importlib.util
import io
from pathlib import Path
import tarfile
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('extract_release', Path(__file__).with_name('extract-release.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ArchiveTests(unittest.TestCase):
    def check_archive(self, entries, expected_error=None):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            archive = root / 'release.tar.gz'
            destination = root / 'release'
            destination.mkdir()
            with tarfile.open(archive, 'w:gz') as bundle:
                for name, kind, value in entries:
                    member = tarfile.TarInfo(name)
                    member.type = kind
                    if kind == tarfile.REGTYPE:
                        member.size = len(value)
                        bundle.addfile(member, io.BytesIO(value))
                    else:
                        member.linkname = value
                        bundle.addfile(member)
            if expected_error:
                with self.assertRaises(expected_error):
                    module.extract(archive, destination)
            else:
                module.extract(archive, destination)
                self.assertEqual((destination / 'public/deployment-revision.txt').read_bytes(), b'test')
            self.assertFalse((root / 'escaped').exists())

    def test_valid_release(self):
        self.check_archive([(name, tarfile.REGTYPE, b'test') for name in
                            ['node', 'server.js', 'start.sh', '.next/BUILD_ID', 'public/deployment-revision.txt']])

    def test_parent_traversal(self):
        self.check_archive([('../escaped', tarfile.REGTYPE, b'no')], ValueError)

    def test_absolute_path(self):
        self.check_archive([('/escaped', tarfile.REGTYPE, b'no')], ValueError)

    def test_escaping_symlink(self):
        self.check_archive([('link', tarfile.SYMTYPE, '../escaped')], ValueError)

    def test_device(self):
        self.check_archive([('device', tarfile.CHRTYPE, '')], ValueError)

    def test_incomplete_release(self):
        self.check_archive([('server.js', tarfile.REGTYPE, b'no')], ValueError)


if __name__ == '__main__':
    unittest.main()
