curl --header "Content-Type: text/xml;charset=UTF-8" --data \
'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:tns="http://www.examples.com/wsdl/MyService.wsdl">
<soap:Body>
<tns:PartLookup>
<name>1234567890</name>
</tns:PartLookup>
</soap:Body>
</soap:Envelope>' \
http://localhost:8000/PartLookup