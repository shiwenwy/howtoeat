import { get, post } from 'src/utils/requestUtils'

export const useMeun = async(files, peopleNum, weight, meat, vegetable, consumeSliderValue, diet, setFinalResult) => {
  if (!peopleNum || !weight || !meat || !vegetable || !consumeSliderValue || !diet) {
    return;
  }
  console.log('useMeun');
    const json = {
        files: files || ['https://p9-bot-sign.byteimg.com/tos-cn-i-v4nquku3lp/b21e0efe658f44f6af20aa1462e01d52.png~tplv-v4nquku3lp-image.image?rk3s=68e6b6b5&x-expires=1724745937&x-signature=UqHtG9MUs%2FtrAYa%2FqpAAvJ%2B3UEU%3D'],
        peopleNum: peopleNum,
        weight: weight,
        meat: meat,
        vegetable: vegetable,
        consumeSliderValue: consumeSliderValue,
        diet: diet,
      };
      console.log(JSON.stringify(json));
      const headers = {
        'Authorization': 'Bearer pat_9RjduSpYcrMmaV0RXb0bchR0Nnbj6kalK14zFdrJveFrYHVXLavtjgY1r2NcaRZ0'
      }
      const data = {
        'bot_id': '7399178014221369381',
        'user_id': 'test_user_id',
        'additional_messages': [
          {
            role: 'user',
            type: 'question',
            content: JSON.stringify(json),
            content_type: 'text'
          }
        ],
        'stream': false
      }
      const res = await post('/v3/chat', data, headers);
      console.log(res);
      if(res.code === 0 && res.data.conversation_id) {
        // conversation_id: "7401419780965613609"
        // "7401419780965629993"
        // 每2s调用一次接口，直到返回的结果符合预期才结束
        const id = res.data.id;
        const conversationId = res.data.conversation_id;
        let intervalId = null;
        intervalId = setInterval(async () => {
            try {
                const query = {
                    'chat_id': id,
                    'conversation_id': conversationId
                }
                const res = await get('/v3/chat/retrieve', query, headers);
                if (res.code === 0 && res.data.status === 'completed') {
                    clearInterval(intervalId);
                    const finalResult = await get('/v3/chat/message/list', query, headers);
                    if (finalResult.code === 0) {
                      finalResult.data.filter(item => item.role === 'assistant' && item.type === 'answer').forEach(item => {
                        setFinalResult(item.content);
                        return;
                      });
                    }
                }
            } catch (error) {
                console.error('Error in GET request:', error);
                clearInterval(intervalId); // 出错时清除定时器
            }
        
        }, 2000);
      }

}