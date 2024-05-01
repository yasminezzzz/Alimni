from frappe import db

def get_context(context):
    discover = db.sql("""
       SELECT t1.parent, t1.subject_name, t2.subject_image
FROM tabsubject t1
JOIN tabsubjects t2 ON t1.subject_name = t2.subject_name
WHERE t1.parenttype = 'level';
            
    """, as_dict=True)
    
    context.discover = discover

