const { addBudget, getBudgets, deleteBudget, updateBudget } = require('../controllers/budget')
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income')
const { requireSignIn } = require('../middlewares/authMiddleware');

const router = require('express').Router()

//income

router.post('/add-income', addIncome)
router.get('/get-incomes', getIncomes)
router.delete('/delete-income/:id', deleteIncome)
router.put('/update-income/:id', updateIncome)

//expenses
router.post('/add-expense', addExpense)
router.get('/get-expenses', getExpenses)
router.delete('/delete-expense/:id', deleteExpense)
router.put('/update-expense/:id', updateExpense)

//budget
router.post('/add-budget', addBudget)
router.get('/get-budgets', getBudgets)
router.delete('/delete-budget/:id', deleteBudget)
router.put('/update-budget/:id', updateBudget)


module.exports= router