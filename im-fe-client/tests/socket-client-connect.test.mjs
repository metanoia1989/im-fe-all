import io from 'socket.io-client';

var socket = io("http://127.0.0.1:7001", {
  query: {
    scene: 'im',
    userId: 544,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZXMiOlt7ImlkIjoyLCJuYW1lIjoi55So5oi3Iiwia2V5TmFtZSI6InVzZXIiLCJkZXNjIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0xMiAxMjoyMjowMSIsInVzZXJfcm9sZSI6eyJjcmVhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0xMiAxMjoyMjowMSIsInJvbGVJZCI6MiwidXNlcklkIjoyfX1dLCJyaWdodHMiOlt7ImlkIjoyLCJuYW1lIjoi55m75b2VIiwia2V5TmFtZSI6ImxvZ2luIiwiZGVzYyI6Iuadg-mZkOW3suS9v-eUqO-8jOivt-S4jeimgeaTjeS9nO-8ge-8ge-8gSIsImNyZWF0ZWRBdCI6IjIwMjEtMTEtMTIgMTI6MjI6MDEiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwicm9sZV9yaWdodCI6eyJjcmVhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0xMiAxMjoyMjowMSIsInJpZ2h0SWQiOjIsInJvbGVJZCI6Mn19LHsiaWQiOjMsIm5hbWUiOiLlj5HoqIAiLCJrZXlOYW1lIjoic3BlYWsiLCJkZXNjIjoi5p2D6ZmQ5bey5L2_55So77yM6K-35LiN6KaB5pON5L2c77yB77yB77yBIiwiY3JlYXRlZEF0IjoiMjAyMS0xMS0xMiAxMjoyMjowMSIsInVwZGF0ZWRBdCI6IjIwMjEtMTEtMTIgMTI6MjI6MDEiLCJyb2xlX3JpZ2h0Ijp7ImNyZWF0ZWRBdCI6IjIwMjEtMTEtMTIgMTI6MjI6MDEiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwicmlnaHRJZCI6Mywicm9sZUlkIjoyfX1dLCJ1c2VySW5mbyI6eyJpZCI6Miwibmlja25hbWUiOiJ1c2VyIiwicGhvdG8iOiIvcHVibGljL2ltYWdlcy9oZWFkMy5wbmciLCJzaWduIjoi5b-15b-15LiN5b-Y77yM5b-F5pyJ5Zue5ZONfiIsImNyZWF0ZWRBdCI6IjIwMjEtMTEtMTIgMTI6MjI6MDEiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTEyIDEyOjIyOjAxIiwidXNlcklkIjoyfSwiaWF0IjoxNjM2ODk5NTQ3fQ.N7SMe5-n91E_1fRkplylLs-8MqfcxR3iRgkQE2L2RPw'
  },
  transports: ['websocket'],
  timeout: 5000
});

socket.on('connect', () => {
  console.log('socket连接成功，开始获取会话列表！');
});

socket.on('error', error => {
  console.log('socket连接出错', error);
});

socket.connect();