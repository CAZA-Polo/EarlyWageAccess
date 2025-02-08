const Customer = require('../model/Customer');
const Account = require('../model/Account');

const serverErrorMessage = 'Internal server error, please try again';

module.exports.employee_onboarding_list = async (req,res) => {

    const { id } = req.params;
    const title = 'EWA Employee Onboarding List';

    try {
        // customer CIF, customer name, account, mobile number, employer account, employer name, email address
        const employerCustomer = await Customer.findOne({ _id: id, is_employer: true })
        .populate({
            path: 'employees'
        });
        const employerAccount = await Account.findOne({ customer_id: employerCustomer._id });
        if(!employerCustomer) throw Error(`No employer found for ID ${id}`);
        if(employerCustomer.employees.length < 1) throw Error(`No employees found for customer (${employerCustomer.customer_name})`)
        
        const employees = await Promise.all(employerCustomer.employees.map(async (employee) => {
            const account = await Account.findOne({ customer_id: employee });
            return {
                employee_cif: employee._id,
                customer_name: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
                account_number: account.account_number,
                mobile_number: employee.phone_number,
                employee_email: employee.email_address
            }
        })); 
      
        res.status(200).json({ title, employer_name: employerCustomer.customer_name, employer_cif: employerCustomer._id ,employer_account: employerAccount.account_number, employees });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.cash_advance_limit_issuance = async (req,res) => {

}

