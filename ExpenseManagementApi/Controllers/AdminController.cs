using ExpenseManagementApi.Model;
using ExpenseManagementApi.Services.Admin.Interface;
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
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [AllowAnonymous]
        [HttpGet("GetAllCategory")]
        public async Task<IActionResult> GetAllCategory()
        {
            try
            {
                var res = await _adminService.GetAllCategory();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't get All Category" });
            }
        }
        [HttpPost("CreateCategory")]
        public async Task<IActionResult> Create([FromBody] CategoryModel categoryModel)
        {
            try
            {
                var result = await _adminService.CreateCategory(categoryModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Failed to Create Category" });
            }
        }

        [HttpGet("GetCategoryById/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var result = await _adminService.GetCategoryById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't get Category" });
            }
        }

        [HttpPut("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryModel categoryModel)
        {
            try
            {
                var result = await _adminService.UpdateCategory(categoryModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Update Category" });
            }
        }
        [HttpDelete("DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var result = await _adminService.DeleteCategory(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok(new { message = "Can't Delete Category" });
            }
        }
    }
}
