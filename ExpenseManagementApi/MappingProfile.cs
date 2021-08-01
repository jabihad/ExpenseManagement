using AutoMapper;
using ExpenseManagement.Data.DTO;
using ExpenseManagement.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpenseManagementApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
            
            //CreateMap<ExtensionModel, Extension>().ReverseMap();
        }
    }
}
