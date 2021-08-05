using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseManagement.Data.Entity
{
    public class Expense
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public decimal Amount { get; set; }
        public DateTime ExpenseDate { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
