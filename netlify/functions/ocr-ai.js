exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { image } = JSON.parse(event.body || "{}");

    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "缺少图片" })
      };
    }

    const response = await fetch(
      "https://open.bigmodel.cn/api/paas/v4/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.ZHIPU_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "glm-4.6v-flash",
          messages: [{
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: image }
              },
              {
                type: "text",
                text: "识别逆水寒帮会货运截图，只返回JSON数组：[{'itemName':'','quantity':0,'rewardPages':0}]，必须返回8条订单。"
              }
            ]
          }],
          thinking: { type: "enabled" }
        })
      }
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await response.json())
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
