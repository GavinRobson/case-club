type Info = {
  header: string;
  content: string;
}

const Information = (info: Info) => {
  return ( 
    <div className="bg-slate-700 rounded-md shadow-md h-full flex flex-col space-y-2 items-center justify-start text-center p-4">
      <h2 className="text-3xl font-semibold text-slate-200">{info.header}</h2>
      <p className="text-xl text-slate-100">{info.content}</p>
    </div>  
   );
}
 
export default Information;