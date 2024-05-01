from frappe import db, _
import frappe

def get_context(context):
    payment = db.sql("""
        SELECT pays, card_number, first_name, last_name, offer.offer_name AS offer_name, offer.price AS offer_price, zip_code
        FROM tabPayment
        INNER JOIN taboffer AS offer
        ON tabPayment.offer = offer.name;
    """, as_dict=True)
    
    offers = db.sql("""
        SELECT name, offer_name, price
        FROM taboffer;
    """, as_dict=True)
    
    context.payment = payment
    context.offers = offers

@frappe.whitelist()
def process_payment(first_name, last_name):
    try:
      
        students = frappe.get_list("student", filters={"parent_firstname": first_name, "parent_lastname": last_name}, fields=["name"])
        if students:
            for student in students:
                frappe.db.set_value("student", student.name, "payment_status", "Paid")
            return {"success": True}
        else:
            return {"success": False, "message": "Aucun étudiant trouvé avec ces prénom et nom de parent."}
    except Exception as e:
        frappe.log_error(_("Erreur lors du traitement du paiement : {0}").format(str(e)))
        return {"success": False, "message": "Une erreur s'est produite lors du traitement du paiement."}
