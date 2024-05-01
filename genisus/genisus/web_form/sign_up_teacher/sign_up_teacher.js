frappe.ready(function() {
	frappe.web_form.validate = () => {
		let data = frappe.web_form.get_values();
	
		for (let field in data) {
			if (!data[field]) {
				frappe.msgprint('All fields are required');
				return false;
			}
		}
	
	
		if (!(/^\d{8}$/.test(data.identity))) {
			frappe.msgprint('Identity must be 8 digits long');
			return false;
		}
	
		if (data.password !== data.identity) {
			frappe.msgprint('Password must match the identity');
			return false;
		}
	
		
		let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let fullName = data.first_name + '.' + data.last_name;
		if (!emailRegex.test(data.email) || data.email !== fullName.toLowerCase() + '@gmail.com') {
			frappe.msgprint('Email must be in the format: first_name.last_name@gmail.com');
			return false;
		}
	
		return true;
	};
	
	
});
