import React from 'react'
import {AlertCircle, Plus} from 'lucide-react';

export const AddGoalForm = ({onAddGoal,maxGoals=20,currentGoalsCount=0}) => {
    const[showForm,setShowForm] = React.useState(false);
    const[formData,setFormData] = React.useState({
        title: '',
        targetAmount: '',
        currency: 'INR',
    });
    const [error, setError] = React.useState({});
    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    };
    const validateForm = () => {
        const newErrors = {};
        if(!formData.title.trim()) newErrors.name='Please Enter a Goal Name';
        else if(formData.name.trim().length>50) newErrors.name='Goal Name length Limit Exceeded';
        const amount=formData.targetAmount;

        if(!amount) newErrors.targetAmount='Please Enter a Target Amount';
        else if(isNaN(amount)||Number(amount)<=0) newErrors.targetAmount='Please Enter a Valid Amount';
        else if(Number(amount)>1e9) newErrors.targetAmount='Target Amount Exceeds Limit';

        return newErrors;
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newErrors=validateForm();
        if(newErrors.length>0){
            setError(newErrors);
            return;
        }

        onAddGoal({
            name:formData.name.trim(),
            targetAmount:formData.targetAmount,
            currency:formData.currency
        });
        setFormData({
            title: '',
            targetAmount: '',
            currency: 'INR',
        });
    }
    const handleCancel=()=>{
        setFormData({
            title: '',
            targetAmount: '',
            currency: 'INR',
        });
        setError({});
        setShowForm(false);
    }
    const maxGoalsReached = currentGoalsCount >= maxGoals;
    if(!showForm){
        return (
            <div>
                <button onClick={()=>setShowForm(true)} disabled={maxGoalsReached}>
                    <Plus size={16} />
                    {maxGoalsReached ? 'Max Goals Reached' : 'Add Goal'}
                </button>
            </div>
        );
    }
    return (
        <div>
            <h3>Create New Goal</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Goal Name</label><br />
                    <input type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange}
                        maxLength={50}
                    />
                    {error.name&&(<div>
                        <AlertCircle size={14} />
                        {error.name}
                    </div>)}
                </div>
                <div>
                    <label htmlFor="targetAmount">Target Amount</label><br />
                    <input type="text" id="targetAmount" name="targetAmount" value={formData.targetAmount}
                    onChange={handleChange}
                    />
                    {error.targetAmount&&(<div>
                        <AlertCircle size={14} />
                        {error.targetAmount}
                    </div>)}
                </div>
                <div>
                    <label htmlFor="currency">Currency*</label><br />
                    <select id="currency" name="currency" value={formData.currency} onChange={handleChange}>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div>
                    <button>
                        <Plus size={16}/> Add Goal
                    </button>                    
                    <button>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddGoalForm;

