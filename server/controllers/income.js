const incomeSchema = require("../models/incomeModel");
const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
  
    const income =  incomeSchema({
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
      await income.save();
      console.log('Income added:', income);
      res.status(200).json({ message: 'Income added' });
    } catch (error) {
      console.error('Error adding income:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getIncomes = async (req,res) => {
    try {
const incomes = await incomeSchema.find().sort({createdAt : -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message : 'Internal server error'})
    }
  }

  const deleteIncome = async (req,res) => {
   const {id} = req.params;
incomeSchema.findByIdAndDelete(id)
.then((income) => {
    res.status(200).json({message : 'Income deleted'})
})
.catch((err) => {
    res.status(500).json({message : 'Internal server error'})
})
  } 

module.exports = {addIncome , getIncomes , deleteIncome}