import React, { useState } from 'react'
import "./ModuleList.css"
const ModuleList = () => {
    const modules = [
        {
          title: "Inventory Management",
          subOptions: [
            "Product Management",
            "Stock Tracking",
            "Warehouse Management",
            "Barcode Scanning",
            "Stock Alerts and Reordering",
          ],
        },
        {
          title: "Sales Management",
          subOptions: [
            "Sales Order Processing",
            "Point of Sale (POS) System",
            "Payment Processing",
            "Sales Analytics and Reporting",
            "Discounts and Promotions Management",
          ],
        },
        {
          title: "Customer Relationship Management (CRM)",
          subOptions: [
            "Customer Profiles and Segmentation",
            "Purchase History Tracking",
            "Loyalty and Rewards Programs",
            "Customer Communication Logs",
            "Feedback and Support Management",
          ],
        },
        {
            title: "Supplier Management",
            subOptions: [
             "Supplier Profiles and Contacts",
             "Purchase Order Management",
             "Supplier Performance Tracking",
             "Invoice Management"   
            ],
          },
          {
            title: "Financial Management",
            subOptions: [
                "General Ledger",
                "Accounts Receivable and Payable",
                "Financial Reporting",
                "Budgeting and Forecasting"
            ],
          },
          {
            title: "Reporting and Analytics",
            subOptions: [
                	"Sales Reports",
                	"Inventory Reports",
                	"Customer Insights",
                	"Performance Dashboards",
                	"Custom Report Generation"                
            ],
          },
          {
            title: "User Management",
            subOptions: [
                "Role-Based Access Control",
                "User Authentication and Security",
                "Activity Logging"
            ],
          },
          {
            title: "Human Resources Management (HRM) (if applicable)",
            subOptions: [
                "Employee Records Management",
                "Attendance Tracking",
                "Payroll Management",
                "Recruitment and Onboarding"
            ],
          },{
            title: "E-commerce Integration",
            subOptions: [
                "Online Store Management",
                "Order Synchronization",
                "Customer Management",
                "Payment Gateway Integration"
            ],
          },{
            title: "Supply Chain Management (optional)",
            subOptions: [
                "Demand Planning",
                "Procurement Management",
                "Logistics and Shipping Management"
            ],
          },{
            title: "Mobile Application (optional)",
            subOptions: [
                "Mobile Access to ERP Features",
                "Inventory Management on the Go",
                "Sales Processing via Mobile Devices"                
            ],
          },{
            title: "Help Desk and Support (optional)",
            subOptions: [
                "Ticketing System",
                "Customer Support Management",
                "Knowledge Base"                
            ],
          },{
            title: "Compliance and Audit Management",
            subOptions: [
                "Regulatory Compliance Tracking",
                "Audit Trails and Reports"
            ],
          },{
            title: "Document Management",
            subOptions: [
                "Centralized Document Repository",
                 "Document Sharing and Collaboration"
            ],
          },
      ];
      
      const [expanded, setExpanded] = useState<Record<number, boolean>>({});

      const toggleExpand = (index:any) => {
        setExpanded((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };
    
      const handleClick = (item:string,subIndex:number) => {
        alert(`You clicked: ${item} ${subIndex}`);
      };
    
      return (
        <div className='module-list-container'>
            <div className='module-heading'>
          <h1>Acceldream ERP Modules</h1>
          </div>
          <div className='module-options'>
          <ul className='module-options-title-ul'>
            {modules.map((module, index) => (
              <li key={index} className='module-options-title-li'>
                <h2
                  className='module-options-title'
                  onClick={() => toggleExpand(index)}
                >
                  {module.title}
                </h2>
                {expanded[index] && (
                  <ul className='module-options-subOptions-ul'>
                    {module.subOptions.map((subOption, subIndex) => (
                      <li
                        key={subIndex}
                        className='module-options-subOption-li'
                        onClick={() => handleClick(subOption,subIndex)}
                      >
                        {subOption}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          </div>
        
        </div>
      );
}

export default ModuleList
