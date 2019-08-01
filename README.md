# backend_trip-split

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>HTTP Request</th>
      <th>End Point</th>
      <th>Functionality</th
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/parcels</td>
      <td>Fetch all parcel delivery orders</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/parcels/:parcelId</td>
      <td>Fetch a specific parcel delivery order</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/:userId/parcels</td>
      <td>Fetch all parcel delivery orders by a specific user</td>
  </tr>
   <tr>
      <td>PUT</td>
      <td>/api/v1/parcels/:parcelId/cancel</td>
      <td>Cancel the specific parcel delivery order</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/parcels</td>
      <td>Create a parcel delivery order</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/parcels/:parcelId/status</td>
      <td>change the status of a parcel order </td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/parcels/:parcelId/presentLocation</td>
      <td>change the present location of a parcel order </td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/parcels/:parcelId/destination</td>
      <td>change the destination of a parcel order </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/auth/resetpassword</td>
      <td>sent email to user to reset password</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/users/auth/resetpassword</td>
      <td>Change to new user password</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>sign up users </td>
  </tr>
   <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>login users </td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/users/:userId/:parcelId</td>
      <td>Fetch a user particular parcel order </td>
  </tr>
</table>

<br/>
<hr>