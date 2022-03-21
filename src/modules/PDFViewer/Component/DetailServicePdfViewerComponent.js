import React from 'react'

const DetailServicePdfViewerComponent = () => {
  return (
      <Fragment>
    <div style="border-width: 2px; border-style: dotted; padding: 1em; font-size:120%;line-height: 1.5em;" id="fromHTMLtestdiv">
<div>
 <h1>INVOICE No. 1</h1>
 <p style="float:left">Doe, John A</p> 
 <p style="float:right">Oklahoma city</p> 
</div>

 <table>
 <colgroup>
 <col width="10%">
 <col width="30%">
 <col width="40%">
 <col width="10%">
 <col width="10%">
 </colgroup>
 <thead>
 <tr>
  <th>id</th>
  <th>item name</th>
  <th>description</th>
  <th>price</th>
  <th>qty</th>
  <th>subtotal</th>
</tr>
</thead>
<tbody>


@foreach ($items as $item => $value)
<tr>

<td>{{$value->itemId}}</td>
<td>{{$value->itemName}}</td>
<td>{{$value->description}}</td>
<td>{{$value->itemPrice}}</td>
<td>{{$value->quantity}}</td>
<td>{{$value->quantity*$value->itemPrice}}</td>

 </tr>
 @endforeach


</tbody>

</table>


</div>
      </Fragment>
  )
}

export default DetailServicePdfViewerComponent