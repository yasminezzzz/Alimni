frappe.ui.form.on('Student', {
    offer: function (frm, cdt, cdn) {
      var student = locals[cdt][cdn];
      var offer = student.offer;
      var group = student.group;
  
      // Check if the offer has reached its maximum enrollment
      var offer_doc = frappe.get_doc('Offer', offer);
      if (offer_doc.enrollment_max <= frappe.get_all('Student Group', {
        filters: {
          offer: offer
        },
        fields: ['*']
      }).length) {
        frappe.msgprint('This offer has reached its maximum enrollment.');
        return;
      }
  
      // Check if the student is already in a group
      if (group) {
        var group_doc = frappe.get_doc('Student Group', group);
        if (group_doc.offer === offer) {
          // The student is already in a group with the same offer, no need to add them again
          return;
        }
      }
  
      // Create a new group or add the student to an existing group
      var groups = frappe.get_all('Student Group', {
        filters: {
          offer: offer
        },
        fields: ['name', 'students']
      });
  
      if (groups.length > 0) {
        // Add the student to an existing group with the same offer
        var existing_group = groups[0];
        existing_group.students.push(student.name);
        frappe.model.set_value(existing_group.doctype, existing_group.name, 'students', existing_group.students);
        frappe.model.set_value(cdt, cdn, 'group', existing_group.name);
      } else {
        // Create a new group with the selected offer and add the student
        var new_group = {
          offer: offer,
          students: [student.name]
        };
        frappe.model.with_doctype('Student Group', function () {
          frappe.model.insert_doc('Student Group', new_group);
        });
        frappe.model.set_value(cdt, cdn, 'group', new_group.name);
      }
    }
  });
  