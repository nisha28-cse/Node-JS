import unittest
import sqlite3
from app import app

class TestCart(unittest.TestCase):
    def setUp(self):
        # Create a test client
        self.app = app.test_client()

        # Reset database before each test
        conn = sqlite3.connect('cart.db')
        conn.execute('DROP TABLE IF EXISTS items')
        conn.execute('CREATE TABLE items (name TEXT, price REAL)')
        conn.commit()
        conn.close()

    def test_home(self):
        """Test if homepage loads correctly"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_add_item(self):
        """Test adding an item to the database"""
        response = self.app.post('/add', data=dict(name="Apple", price="10.5"))
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Item Added!", response.data)

        # Check if item actually inserted into database
        conn = sqlite3.connect('cart.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM items WHERE name=?", ("Apple",))
        item = cursor.fetchone()
        conn.close()

        self.assertIsNotNone(item)  # Item should exist
        self.assertEqual(item[0], "Apple")
        self.assertEqual(item[1], 10.5)

if __name__ == "__main__":
    unittest.main()
