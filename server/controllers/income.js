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
  const updateIncome  = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
  
    try {
      const updatedIncome  = await incomeSchema.findByIdAndUpdate(
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
  
      if (!updatedIncome) {
        return res.status(404).json({ message: 'Income not found' });
      }
  
      res.status(200).json({ message: 'Income updated', updatedIncome  });
    } catch (error) {
      console.error('Error updating Income :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {addIncome , getIncomes , deleteIncome , updateIncome}
// const incomeSchema = require("../models/incomeModel");
// const User = require("../models/userModel");

// const addIncome = async (req, res) => {
//   const { title, amount, category, description, date } = req.body;

//   try {
//     // validations
//     if (!title || !category || !description || !date) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
//     if (amount <= 0 || isNaN(amount)) {
//       return res
//         .status(400)
//         .json({ message: 'Amount must be a positive number' });
//     }

//     // Get the user ID from the request
//     const userId = req.user._id; // Assuming you store the user object in the request during authentication

//     // Create an income object with user ID
//     const income = new incomeSchema({
//       title,
//       amount,
//       category,
//       description,
//       date,
//       user: userId,
//     });

//     // Save to the database
//     await income.save();
//     console.log('Income added:', income);

//     res.status(200).json({ message: 'Income added' });
//   } catch (error) {
//     console.error('Error adding income:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// const getIncomes = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const incomes = await incomeSchema.find({ user: userId }).sort({ createdAt: -1 });
//     res.status(200).json(incomes);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const deleteIncome = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user._id;

//   try {
//     const deletedIncome = await incomeSchema.findOneAndDelete({ _id: id, user: userId });

//     if (!deletedIncome) {
//       return res.status(404).json({ message: 'Income not found' });
//     }

//     res.status(200).json({ message: 'Income deleted' });
//   } catch (error) {
//     console.error('Error deleting income:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const updateIncome = async (req, res) => {
//   const { id } = req.params;
//   const { title, amount, category, description, date } = req.body;
//   const userId = req.user._id;

//   try {
//     const updatedIncome = await incomeSchema.findOneAndUpdate(
//       { _id: id, user: userId },
//       {
//         title,
//         amount,
//         category,
//         description,
//         date,
//       },
//       { new: true }
//     );

//     if (!updatedIncome) {
//       return res.status(404).json({ message: 'Income not found' });
//     }

//     res.status(200).json({ message: 'Income updated', updatedIncome });
//   } catch (error) {
//     console.error('Error updating income:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = { addIncome, getIncomes, deleteIncome, updateIncome };
