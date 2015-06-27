/**
 * Created by Arpad Budai on 2015. 06. 27..
 */

function sortBy() { 
    var selectedIndex=0;
    selectedIndex=document.forms["sort"].sortList.selectedIndex;
    document.forms["sort"].sortList.selectedIndex=selectedIndex;
    document.forms["sort"].submit() ;
} 