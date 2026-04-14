async function testApi() {
    const hugeText = '[CONDITIONS] ' + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50); // ~3000 chars

    console.log('Testing length:', hugeText.length);
    const fd = new FormData();
    fd.append('MembershipName', hugeText);

    try {
        const res = await fetch('https://tanmia.nasatechnology.net/api/Membership', { method: 'POST', body: fd });
        const txt = await res.text();
        console.log('Status:', res.status);
        console.log('Response:', txt);
    } catch(err) {
        console.error('Error:', err);
    }
}
testApi();
