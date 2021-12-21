using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogicContracts
{
    public interface IService<E, ID> where ID : IComparable
    {
        E Insert(E entity);

        E Update(E entity);

        E Delete(E entity);

        E GetById(ID Id);

        IEnumerable<E> GetAll();
    }
}
