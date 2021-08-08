using AutoMapper;
using ExpenseManagement.Data.Entity;
using ExpenseManagementApi.Model;
using ExpenseManagementApi.Repositories;
using ExpenseManagementApi.Services.ServiceExpense.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Services.ServiceExpense.Implementation
{
    public class ExpenseService : IExpenseService
    {
        private readonly IRepository<Expense> _expense;
        private readonly IRepository<Category> _category;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ExpenseService(IRepository<Expense> expense, IRepository<Category> category, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _expense = expense;
            _category = category;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ExpenseModel> CreateExpense(ExpenseModel expenseModel)
        {
            var userId = _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            expenseModel.UserId = userId;
            expenseModel.ExpenseDate = DateTime.UtcNow;
            var expense = _mapper.Map<Expense>(expenseModel);
            var res = await _expense.CreateAsync(expense);
            return _mapper.Map<ExpenseModel>(res);
        }

        public async Task<int> DeleteExpense(int id)
        {
            var res = await _expense.DeleteAsync(e => e.Id == id);
            return res;
        }

        public async Task<ExpenseModel> UpdateExpense(ExpenseModel expenseModel)
        {
            var expense = await _expense.FindAsync(e => e.Id == expenseModel.Id);
            expense.ItemName = expenseModel.ItemName;
            expense.Amount = expenseModel.Amount;
            expense.CategoryId = expenseModel.CategoryId;
            var result = await _expense.UpdateAsync(expense);
            return _mapper.Map<ExpenseModel>(result);
        }

        public async Task<ExpenseModel> GetExpenseById(int id)
        {
            var expense = await _expense.FindAsync(e => e.Id == id);
            var expenseModel = _mapper.Map<ExpenseModel>(expense);
            return expenseModel;
        }

        public async Task<IEnumerable<ExpenseModel>> GetAllExpense()
        {
            var userId = _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
            var expense = await _expense.FindAllAsync(e => e.UserId == userId);
            var expenseModel = _mapper.Map<IEnumerable<ExpenseModel>>(expense);
            foreach(var item in expenseModel)
            {
                var category = await _category.FindAsync(c => c.Id == item.CategoryId);
                item.CategoryName = category.Name;
            }
            
            return expenseModel;
        }
        public async Task<Dictionary<string, Decimal>> CalculateMonthlyExpense()
        {
            var userId = _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            Dictionary<string, decimal> dictMonthlySum = new Dictionary<string, decimal>();

            var food = await _expense.FindAllAsync
                (e => e.Category.Name == "Food" && e.UserId==userId && (e.ExpenseDate > DateTime.Now.AddMonths(-7)));
            var foodSum = food.Select(c => c.Amount).Sum();

            var shopping = await _expense.FindAllAsync
                (e => e.Category.Name == "Shopping" && e.UserId == userId && (e.ExpenseDate > DateTime.Now.AddMonths(-7)));
            var shoppingSum = shopping.Select(c => c.Amount).Sum();

            var travel = await _expense.FindAllAsync
                (e => e.Category.Name == "Travel" && e.UserId == userId && (e.ExpenseDate > DateTime.Now.AddMonths(-7)));
            var travelSum = travel.Select(c => c.Amount).Sum();

            var health = await _expense.FindAllAsync
                (e => e.Category.Name == "Health" && e.UserId == userId && (e.ExpenseDate > DateTime.Now.AddMonths(-7)));
            var healthSum = health.Select(c => c.Amount).Sum();

            dictMonthlySum.Add("Food", foodSum);
            dictMonthlySum.Add("Shopping", shoppingSum); 
            dictMonthlySum.Add("Travel", travelSum); 
            dictMonthlySum.Add("Health", healthSum);

            return dictMonthlySum;
        }


    }
}
