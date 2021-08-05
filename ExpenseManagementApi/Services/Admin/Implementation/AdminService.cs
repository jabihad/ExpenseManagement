using AutoMapper;
using ExpenseManagement.Data.Entity;
using ExpenseManagementApi.Model;
using ExpenseManagementApi.Repositories;
using ExpenseManagementApi.Services.Admin.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Services.Admin.Implementation
{
    public class AdminService : IAdminService
    {
        private readonly IRepository<Category> _category; 
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;
        public AdminService(IRepository<Category> category, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _category = category;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }
        public async Task<CategoryModel> CreateCategory(CategoryModel categoryModel)
        {
            var category = _mapper.Map<Category>(categoryModel);
            var res = await _category.CreateAsync(category);
            return _mapper.Map<CategoryModel>(res);
        }

        public async Task<int> DeleteCategory(int id)
        {
            var res = await _category.DeleteAsync(c => c.Id == id);
            return res;
        }

        public async Task<IEnumerable<CategoryModel>> GetAllCategory()
        {
            var res = await _category.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryModel>>(res);
        }

        public async Task<CategoryModel> GetCategoryById(int id)
        {
            var res = await _category.FindAsync(c => c.Id == id);
            return _mapper.Map<CategoryModel>(res);
        }

        public async Task<CategoryModel> UpdateCategory(CategoryModel categoryModel)
        {
            var category = await _category.FindAsync(c => c.Id == categoryModel.Id);
            category.Name = categoryModel.Name;
            category.Description = categoryModel.Description;
            var result = await _category.UpdateAsync(category);
            return _mapper.Map<CategoryModel>(result);
        }
    }
}
