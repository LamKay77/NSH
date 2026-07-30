exports.handler = async function(event) {

    const headers = {
        "Access-Control-Allow-Origin": "https://lamkay77.github.io",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };


    // CORS预检
    if(event.httpMethod === "OPTIONS"){

        return {
            statusCode:200,
            headers:headers,
            body:""
        };

    }


    if(event.httpMethod !== "POST"){

        return {
            statusCode:405,
            headers:headers,
            body:"Method Not Allowed"
        };

    }


    try {


        const body =
        JSON.parse(event.body || "{}");


        const image =
        body.image;


        if(!image){

            return {

                statusCode:400,

                headers:headers,

                body:JSON.stringify({
                    error:"没有收到图片"
                })

            };

        }



        const apiResponse =
        await fetch(
            "https://open.bigmodel.cn/api/paas/v4/chat/completions",
            {

                method:"POST",

                headers:{

                    "Authorization":
                    `Bearer ${process.env.ZHIPU_API_KEY}`,

                    "Content-Type":
                    "application/json"

                },


                body:JSON.stringify({

                    model:"glm-4.6v-flash",


                    messages:[

                        {

                            role:"user",

                            content:[


                                {

                                    type:"image_url",

                                    image_url:{

                                        url:image

                                    }

                                },


                                {

                                    type:"text",

                                    text:
`
`
你是逆水寒帮会货运OCR助手。

请识别8条订单。

注意：

必须从截图中的：
1. 道具名称（可出现道具只有：如燕追风匣、惊鹊追风匣、归鸿追风匣、普通资源箱、装备鉴定书、百炼武器鉴定书、兰溪解玉砂，如果识别到近似名称，必须映射到以上名称。）
2. 需求数量
3. 宝图残页奖励

提取。

不要输出推理过程。

只输出JSON。

格式：

[
{
"itemName":"",
"quantity":0,
"rewardPages":0,
"confidence":0
}
]


quantity填写需求数量，
不要填写已拥有数量。

rewardPages填写宝图残页数量。

必须8条。
`

                                }


                            ]

                        }

                    ],


                    thinking:{

                        type:"enabled"

                    }

                })

            }

        );



        const result =
        await apiResponse.json();



        return {

            statusCode:200,

            headers:{

                ...headers,

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(result)

        };



    }catch(error){


        console.error(error);


        return {

            statusCode:500,

            headers:headers,

            body:
            JSON.stringify({

                error:error.message

            })

        };


    }


};
