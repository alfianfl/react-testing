import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { pricePerItem } from "../constants";

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency:'USD',
        minimumFractionDigits:2
    }).format(amount)
}

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails(){
    const context = useContext(OrderDetails);

    if(!context){
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        );
    }
    return context
}

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    })
    const [totals,setTotals] = useState({
        scoops: formatCurrency(0),
        toppings:formatCurrency(0),
        grandTotal:formatCurrency(0)
    })

    function calculateSubtotal(orderType, optionCounts){
        let optionCount = 0
        for (const count of optionCounts[orderType].values()){
            optionCount += count;
        }

        return optionCount * pricePerItem[orderType]
    }
    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        })
    },[optionCounts])
    
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType){
            const newOptionCounts = {...optionCounts}

            // update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptionCounts(newOptionCounts);
        }
        function resetOrder(){
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            })
        }
        // getter object containing option counts for scoops and toppings, subtotal
        // setter: updateOptionCount
        return [{...optionCounts, totals}, updateItemCount, resetOrder];
    },[optionCounts, totals]);
    return <OrderDetails.Provider value={value} {...props} />
}