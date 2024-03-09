using Dapper;
using FastMember;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace PiBooking.Core.Extensions
{
    public static class DapExtension
    {
        //code used from comments found at
        //https://pedroliska.wordpress.com/2016/05/16/tvp-helper-for-dapper-orm/
        public static SqlMapper.ICustomQueryParameter AsTvp<T>(this
        List<T> enumerable, string typeName) where T : class
        {
            var table = new DataTable();
            var members = typeof(T).GetProperties().Select(p => p.Name).ToArray();
            using (var reader = ObjectReader.Create(enumerable, members))
            {
                table.Load(reader);
            }
            return table.AsTableValuedParameter(typeName);
        }
    }
}
