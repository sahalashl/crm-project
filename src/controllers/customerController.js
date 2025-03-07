const Customer = require("../models/Customer");

// Get all customers (with filtering & pagination)
exports.getCustomers = async (req, res) => {
  try {
    const { name, email, location, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = email;
    if (location) filter.location = location;

    const customers = await Customer.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving customers", error: err });
  }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving customer", error: err });
  }
};

// Add a new customer
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: "Error creating customer", error: err });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json(updatedCustomer);
  } catch (err) {
    res.status(500).json({ message: "Error updating customer", error: err });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err });
  }
};