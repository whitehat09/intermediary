export const removeTruck = async (id:string) => {
    const response = await fetch(
      `http://localhost:3000/api/${id}`,
      {
        method: "DELETE"
      }
    );
  
    if (!response.ok) {
      throw new Error('Lỗi !');
    }
  
    return true;
  };
  