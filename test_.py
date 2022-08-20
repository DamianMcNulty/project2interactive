from runserver import app
import unittest


class FlaskTestCase(unittest.TestCase):

     # Ensure that flask was set up correctly
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)
    
    # index.html contains 'Expense Amount'
    def test_index_name(self):
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertTrue(b'Expense Amount', response.data)

if __name__ == '__main__':
    unittest.main()
