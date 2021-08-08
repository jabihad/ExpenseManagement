using ExpenseManagement.Data.Entity;
using ExpenseManagementApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Services.ServiceExpense.Interface
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseModel>> GetAllExpense();
        Task<ExpenseModel> CreateExpense(ExpenseModel expenseModel);
        Task<ExpenseModel> GetExpenseById(int id);
        Task<ExpenseModel> UpdateExpense(ExpenseModel expenseModel);
        Task<int> DeleteExpense(int id);
        Task<Dictionary<string, Decimal>> CalculateMonthlyExpense();
    }
}
