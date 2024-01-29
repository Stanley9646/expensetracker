const budgetModel = require("../models/budgetModel");

const addBudget = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const budget =  budgetModel({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 || isNaN(amount)) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number' });
    }

    // Save to the database
    await budget.save();
    console.log('Budget added:', budget);
    res.status(200).json({ message: 'Budget added' });
  } catch (error) {
    console.error('Error adding budget:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetModel.find().sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  budgetModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Budget deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const updatedBudget = await budgetModel.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        description,
        date,
      },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget updated', updatedBudget });
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addBudget, getBudgets, deleteBudget, updateBudget };
