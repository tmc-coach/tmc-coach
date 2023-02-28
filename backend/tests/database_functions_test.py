import unittest
from unittest import TestCase
import json
import os
from flask import Flask
from flask_cors import CORS
#from flask_testing import TestCase
from app import db
from sqlalchemy.sql import text
from datetime import date
from dotenv import load_dotenv
import requests
import app
from database_functions.get_deadlines import get_deadlines_function
from flask_sqlalchemy import SQLAlchemy


class DeadlinesTestCase(TestCase):
    def test_get_deadlines_only_gets_deadlines_that_have_been_made_by_the_user(self):
        username = os.getenv("TMCUSERNAME")
        deadlines = get_deadlines_function(username)
        dictionary = json.loads(deadlines)

        i = 0
        while True:
            try:
                deadline = dictionary[i]
                self.assertEqual(deadline["username"], username)
            except:
                break
        
        #self.assertEqual(dictionary, "yeet")