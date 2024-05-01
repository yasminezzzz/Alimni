from frappe import db

import frappe
def get_context(context):
    online = db.sql("""
        SELECT 
            o.name AS offer_name,
            o.image AS offer_image,
            o.status AS offer_status,
            o.price AS offer_price,
            o.start_date AS start_date,
            o.end_date AS end_date,
            o.description,
            o.imagedescription,
            GROUP_CONCAT(DISTINCT s.subject_name SEPARATOR ', ') AS subjects,
            details.details_names
        FROM 
            `taboffer` o 
        JOIN 
            `tabsubject` s 
        ON 
            o.name = s.parent 
        LEFT JOIN (
            SELECT 
                parent,
                GROUP_CONCAT(details_name SEPARATOR ', ') AS details_names
            FROM 
                tabdetails
            GROUP BY 
                parent
        ) AS details ON o.name = details.parent
        WHERE
            o.status = 'online' 
        GROUP BY 
            offer_name;
    """, as_dict=True)
    
    context.online= online
