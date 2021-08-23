using ExpenseManagementApi.Model;
using ExpenseManagementApi.Services.ServiceExpense.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Expensecontroller : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        public Expensecontroller(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }
        [Authorize]
        [HttpGet("GetAllExpense")]
        public async Task<IActionResult> GetAllExpense()
        {
            try
            {
                var res = await _expenseService.GetAllExpense();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't get All Expense" });
            }
        }

        [Authorize]
        [HttpPost("CreateExpense")]
        public async Task<IActionResult> Create([FromBody] ExpenseModel expenseModel)
        {
            try
            {
                var result = await _expenseService.CreateExpense(expenseModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Failed to Create Expense" });
            }
        }
        [Authorize]
        [HttpGet("GetExpenseById/{id}")]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            try
            {
                var result = await _expenseService.GetExpenseById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't get Expense" });
            }
        }

        [Authorize]
        [HttpPut("UpdateExpense")]
        public async Task<IActionResult> UpdateExpense([FromBody] ExpenseModel expenseModel)
        {
            try
            {
                var result = await _expenseService.UpdateExpense(expenseModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Update Expense" });
            }
        }

        [Authorize]
        [HttpDelete("DeleteExpense/{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                var result = await _expenseService.DeleteExpense(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Delete Expense" });
            }
        }
        [Authorize]
        [HttpGet("CalculateMonthlyExpense")]
        public async Task<IActionResult> CalculateMonthlyExpense()
        {
            try
            {
                var res = await _expenseService.CalculateMonthlyExpense();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Get Monthly Expense Report" });
            }
        }
        [Authorize]
        [HttpGet("CalculateWeeklyExpense")]
        public async Task<IActionResult> CalculateWeeklyExpense()
        {
            try
            {
                var res = await _expenseService.CalculateWeeklyExpense();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Get Weekly Expense Report" });
            }
        }
    }
}
