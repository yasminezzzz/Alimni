

import frappe
from frappe.model.document import Document

class level(Document):
    def setup(self):
        if not self.get("__islocal"):
            self.add_child_table()

    def add_child_table(self):
        if not self.get("__islocal"):
            if not self.get("subjects"):
                self.append("subjects", {})
            if not self.get("details"):
                self.append("details", {})
