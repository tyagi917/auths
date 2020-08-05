var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});
var conn=mongoose.connection;
var es=new mongoose.Schema({
	name:String,
	email:String,
	etype:String,
	hourlyrate:Number,
	totalhour:Number,
});
es.methods.totalsalary=function()
{
	console.log("total income of %s:rs %d",this.name,this.totalhour+ this.hourlyrate*this.totalhour);
}

var employemode2=mongoose.model('Employee',es);
var employes=new employemode2({
	name:'vanshu',
	email:'tyagipranav000@gmail.com',
	etype:'hourly',
	hourlyrate:20,
	totalhour:16,


});
employes.totalsalary();
//console.log(employes);
conn.on("connected",function()
{
	console.log("connected");
});
conn.on("disconnected",function()
{
	console.log("disconnect");

});
conn.on('error',console.error.bind(console,'connection:error'));
conn.once('open',function(){
	employes.save(function(err,res)
	{
		if(err) throw error;
		console.log(res);
		conn.close();

	});
	/*employemode2.find({},function(err,res)
	{
		if(err) throw error;
		console.log(res);
		conn.close();

	});*/
	/*employemode2.findOne({},function(err,res)
	{
		if(err) throw error;
		console.log(res);
		conn.close();

	});*/
	//employemode2.find({name:'kartik'},function(err,res)
	//{
		//if(err) throw error;
		//console.log(res);
		//conn.close();

	//});
});


