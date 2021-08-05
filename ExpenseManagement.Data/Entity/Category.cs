using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseManagement.Data.Entity
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Expense> Expenses { get; set; }
    }
}
