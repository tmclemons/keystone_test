var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Human Model
 * ==========
 */
var Human = new keystone.List('Human');

Human.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Human.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Human.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Human.defaultColumns = 'name, email, isAdmin';
Human.register();
