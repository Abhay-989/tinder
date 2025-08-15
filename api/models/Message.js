import mongoose from 'mongoose';

const messageSchema =new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User',
        required:true
    },
     reciever:{
        type:mongoose.Schema.Types.ObjectID,
        ref:'User',
        required:true
    },
    content:{
        type:String,
        required:true, 
    }

},{timestamps:true}
);

const Message = mongoose.model("Message",messageSchema);
export default Message;

 
