export async function saveFile(data) {
    try {
        const res = await fetch('http://localhost:5001/upload_entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('res', res);
        if (!res.ok) {
            // 응답 상태 체크
            throw new Error('Network res was not ok');
        }
        // const result = await res.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getFile() {
    try {
        const res = await fetch('http://localhost:5001/file_entry', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            // 응답 상태 체크
            throw new Error('Network res was not ok');
        }
        console.log('res', res);
        // const result = await res.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
