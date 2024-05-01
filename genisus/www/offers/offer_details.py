from frappe import db
import frappe

def get_context(context):
    offer_name = frappe.form_dict.offer_name
    offer = db.get_value("taboffer", {"offer_name": offer_name}, ["description", "imagedescription"], as_dict=True)
    context.offer = offer
