from unittest import TestCase


class ExampleTest(TestCase):
	def setUp(self) -> None:
		pass

	def test_always_passes(self) -> None:
		self.assertTrue(True)

	def test_always_fails(self) -> None:
		self.assertFalse(False)
