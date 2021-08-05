using ExpenseManagementApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi.Services.Admin.Interface
{
    public interface IAdminService
    {
        Task<IEnumerable<CategoryModel>> GetAllCategory();
        Task<CategoryModel> CreateCategory(CategoryModel categoryModel);
        Task<CategoryModel> GetCategoryById(int id);
        Task<CategoryModel> UpdateCategory(CategoryModel categoryModel);
        Task<int> DeleteCategory(int id);
    }
}
