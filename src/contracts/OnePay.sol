pragma solidity ^0.5.0;

import "./ownable.sol";
import "./datetime.sol";

contract OnePay is Ownable, DateTime {

    event BalanceChanged(address indexed _owner, uint256 _newBalance);

    struct Payment {
        string name;
        address from;
        address payable to;
        uint amount;
        uint8 nextDay;
        uint8 nextMonth;
        uint16 nextYear;
        uint interval;
    }

    Payment[] public payments;

    mapping (address => uint256) ownerToBalance; 
    mapping (address =>mapping(address=> Payment)) ownerToPayment;

    constructor() public {
        ownerToBalance[msg.sender] = 0;
    }

    function getSmartContractBalance() external view returns(uint256){
        return address(this).balance;
    }

    function getUserBalance() external view returns(uint256){
        return ownerToBalance[msg.sender];
    }

    function getAddress() external view returns(address){
        return address(this);
    }

    function fundAccount() external payable {
        require(msg.value>0);
        ownerToBalance[msg.sender] = ownerToBalance[msg.sender]+msg.value;
        emit BalanceChanged(msg.sender, ownerToBalance[msg.sender]);
    }

    function withdrawFromAccount(uint256 _amount) external returns (bool){
        require(_amount<=ownerToBalance[msg.sender]);
        msg.sender.transfer(_amount);
        ownerToBalance[msg.sender] = ownerToBalance[msg.sender] - _amount;
        emit BalanceChanged(msg.sender, ownerToBalance[msg.sender]);
        return true;
    }

    function getInterval(string memory _interval) public returns (uint){
        if(keccak256(abi.encodePacked(_interval)) ==keccak256(abi.encodePacked("daily"))){
            return 1 days;
        }
        if(keccak256(abi.encodePacked(_interval)) ==keccak256(abi.encodePacked("weekly"))){
            return 7 days;
        }
        if(keccak256(abi.encodePacked(_interval)) ==keccak256(abi.encodePacked("monthly"))){
            return 30 days;
        }
        if(keccak256(abi.encodePacked(_interval)) ==keccak256(abi.encodePacked("yearly"))){
            return 365 days;
        }
    }

    function addNewBeneficiary(string calldata _name, address payable _to, uint _amount, uint8 _day, uint8 _month, uint16 _year, string calldata _interval) external {
        Payment memory newPayment = Payment(
            _name,
            msg.sender,
            _to,
            _amount,
            _day,
            _month,
            _year, 
            getInterval(_interval)
        );
        payments.push(newPayment);
        ownerToPayment[msg.sender][_to] =  newPayment;
    }

    function getCurrentDay() public view returns(uint8){
        return getDay(now);
    }
    function getCurrentMonth() public view returns(uint8){
        return getMonth(now);

    }
        function getCurrentYear() public view returns(uint16){
        return getYear(now);

    }

    function paymentToday(Payment storage _payment) internal returns(bool){
        if( _payment.nextYear == getYear(now) && _payment.nextMonth == getMonth(now) && _payment.nextDay == getDay(now)){
            return true;
        }
    }

    function sendPayment(Payment storage _payment)internal{
        require(ownerToBalance[_payment.from] >= _payment.amount);
        _payment.to.transfer(_payment.amount);
        ownerToBalance[_payment.from] = ownerToBalance[_payment.from]-_payment.amount;
        uint nextTimeStamp = now + _payment.interval;
        _payment.nextDay = getDay(nextTimeStamp);
        _payment.nextMonth = getMonth(nextTimeStamp);
        _payment.nextYear = getYear(nextTimeStamp);


    }

    function dispersePayments() public returns (string memory){
        for(uint i = 0; i < payments.length; i++){
            Payment storage currentPayment = payments[i];
            if(paymentToday(currentPayment)){
                sendPayment(currentPayment);
                return "abc";
            }
        }
                        return "def";

    }
  


}