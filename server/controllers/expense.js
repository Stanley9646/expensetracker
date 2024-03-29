const ExpenseSchema = require("../models/expenseModel");
const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
  
    const expense =  ExpenseSchema({
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
      if (amount <= 0 ||  !amount === 'number') {
        return res
          .status(400)
          .json({ message: 'Amount must be a positive number' });
      }
  
      // Save to the database
      await expense.save();
      console.log('expense added:', expense);
      res.status(200).json({ message: 'Expense added' });
    } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getExpenses = async (req,res) => {
    try {
const expenses = await ExpenseSchema.find().sort({createdAt : -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message : 'Internal server error'})
    }
  }

  const deleteExpense = async (req,res) => {
   const {id} = req.params;
ExpenseSchema.findByIdAndDelete(id)
.then((expense) => {
    res.status(200).json({message : 'expense deleted'})
})
.catch((err) => {
    res.status(500).json({message : 'Internal server error'})
})
  } 
  const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
  
    try {
      const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
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
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense updated', updatedExpense });
    } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {addExpense , getExpenses , deleteExpense , updateExpense}