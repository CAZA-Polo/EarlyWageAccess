const Customer = require('../model/Customer');
const Account = require('../model/Account');
const Availment = require('../model/Availment');

const serverErrorMessage = 'Internal server error, please try again';

module.exports.employee_onboarding_list = async (req,res) => {

    const { employer_id } = req.params;
    const title = 'EWA Employee Onboarding List';

    try {
        // customer CIF, customer name, account, mobile number, employer account, employer name, email address
        const employerCustomer = await Customer.findOne({ _id: employer_id, is_employer: true })
        .populate({
            path: 'employees'
        });
        const employerAccount = await Account.findOne({ customer_id: employerCustomer._id });
        if(!employerCustomer) throw Error(`No employer found for ID ${employer_id}`);
        if(employerCustomer.employees.length < 1) throw Error(`No employees found for customer (${employerCustomer.customer_name})`)
        
        let employees = await Promise.all(employerCustomer.employees.map(async (employee) => {
            const account = await Account.findOne({ customer_id: employee });
            return {
                employee_cif: employee._id,
                customer_name: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
                account_number: account.account_number,
                mobile_number: employee.phone_number,
                employee_email: employee.email_address
            }
        }));
        
        if(employees.length < 1) {
            employees = `No onboarded employees yet for ${employerCustomer.customer_name}`
        }

        const data = { 
            title, 
            employer_name: employerCustomer.customer_name, 
            employer_cif: employerCustomer._id,
            employer_account: employerAccount.account_number, 
            employees 
        }
      
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.cash_advance_limit_issuance = async (req,res) => {
    const { employer_id } = req.params;
    const title = 'Cash Advance Limit Issuance Report'

    try {
        const employerCustomer = await Customer.findById(employer_id)
        .populate({
            path: 'employees'
        });
        if(!employerCustomer) throw Error(`Missing employer customer CIF: ${employer_id}`);

        const employerAccount = await Account.findOne({ customer_id: employer_id });
        if(!employerAccount) throw Error(`Missing account for employer ${employerCustomer.customer_name}`)

        const employerBalance = employerAccount.account_balance;
        const employerName = employerCustomer.customer_name;

        let employees = await Promise.all(employerCustomer.employees.map(async (employee) => {
            const account = await Account.findOne({ customer_id: employee });
            return {
                employee_cif: employee._id,
                account_number: account.account_number,
                customer_name: `${employee.first_name} ${employee.middle_name} ${employee.last_name}`,
                cash_advance_limit: employee.account_balance
            }
        }));

        if(employees.length < 1) throw Error(`No employees to be displayed for employer ${employerCustomer.customer_name}`);


        const data = {
            title, 
            employer_name: employerName,
            employer_balance: employerBalance,
            employees
        }

        res.status(200).json(data);

    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

// Get all advances which are not paid yet
module.exports.cash_advance_availment = async(req,res) => {
    const { employee_acct_no } = req.params;

    try {
        let availments;
        
        if(employee_acct_no) {
            const account = await Account.findOne({ account_number: employee_acct_no }).populate('customer_id');
            availments = await Availment.find({ account_id: account._id, is_paid: false }).populate('account_id payment_id');
        } else {
            availments = await Availment.find().populate('account_id payment_id');
        }
        
        const data = {
            account_number: employee_acct_no,
            availments
        }

        res.status(200).json(data);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
    

   
}

