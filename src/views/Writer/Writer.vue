<template>
	<Header />
	<div class="authorwriter">
		<div class="author">
			<div class="mass">
				<img src="/src/assets/images/w1.png" alt="">
				<div class="text">
					<h5>欢迎成为番茄作家，快来填写信息～</h5>
					<p>1.作者信息会同步更新到番茄小说APP； 2.优质的头像、笔名和简介，能够让读者更快记住你</p>
				</div>
			</div>

			<div class="fill_in">
				<div class="item">
					<div class="span"><b>*</b>作家头像</div>
					<div class="up_pic">
						<img src="/src/assets/icons/Profile/icons8-user-pulsar-color-96.png" alt="">
						<div class="btn">
							上传头像
							<input type="file" />
						</div>
					</div>
				</div>

				<div class="item">
					<div class="span"><b>*</b>笔名</div>
					<div class="input">
						<input maxlength="10" type="text" placeholder="请勿使用特殊符号或有明显营销推广意图的名称" v-model="name">
						<div class="num">{{name.length}} / 10</div>
					</div>
				</div>

				<div class="item">
					<div class="span"><b>*</b>作家简介</div>
					<div class="input">
						<input maxlength="30" type="text" placeholder="10-30字，内容完整通顺，请勿使用特殊符号，展示个人特色，写作经验，创作方向等"
							v-model="introduction">
						<div class="num">{{introduction.length}} / 30</div>
					</div>
				</div>

				<div class="apply" @click="Apply">
					<div class="icon" :class="apply?'on':''"></div>
					<p>我已阅读并同意<a href="">《个人信息保护声明》</a></p>
				</div>				
				<div class="c"></div>
				<div class="submit">
					<span>成为作家</span>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
	import Header from './components/Header.vue'

	import { ref } from 'vue'

	const name = ref('');
	const introduction = ref('');
	const apply = ref(false);
	
	const Apply = () => {
		apply.value = !apply.value;
	};
</script>

<style scoped>
	
	
	.author{width: 864px;
		margin-top: 65px;
		margin-left: auto;
		margin-right: auto;border-radius: 15px;
		background-color: #fff;
		padding: 30px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.02);
		padding-bottom: 330px;
	}
	
	.author .mass{align-items: center;
	    background-color: #00000005;
	    border-radius: 8px;   position: relative;
	    margin-bottom: 48px;
	    padding: 15px 30px;height: 110px;
		padding-left: 150px;
	}
	.author .mass img{width: 80px;vertical-align: middle;
		position: absolute;top: 50%;
		transform: translateY(-50%);left: 30px;
	}
	.author .mass h5{color: #000;
	    font-size: 16px;margin-top: 15px;
	    font-weight: 500;
	    line-height: 24px;
	    margin-bottom: 6px;
	}
	.author .mass p{color: #000000a3;
	    font-size: 14px;
	    line-height: 24px;
	}
	.author .fill_in{}
	.author .fill_in .item{padding-left: 108px;
		position: relative;margin-bottom: 30px;
	}
	.author .fill_in .item .span{position: absolute;
		left: 0;top: 50%;
		transform: translateY(-50%);color: #a4a4a4;
	    font-size: 14px;
	}
	.author .fill_in .item .span b{color: #ff5f00;margin-right: 3px;}
	.author .fill_in .item .up_pic{}
	.author .fill_in .item .up_pic img{width: 62px;
		vertical-align: middle;border-radius: 50%;
	}
	.author .fill_in .item .up_pic .btn{display: inline-block;
		margin-left: 32px;width: 96px;height: 36px;cursor: pointer;
		border-radius: 50px;text-align: center;line-height:35px;
		background-color: #f5f5f5;font-size: 14px;color: #000;
		position: relative;
	}
	.author .fill_in .item .up_pic .btn:hover{
		background-color: #ebebeb;
	}
	.author .fill_in .item .up_pic input{position: absolute;left: 0;
		top: 0;opacity: 0;width: 100%;height: 100%;cursor: pointer;
	}
	.author .fill_in .item .input{position: relative;}
	.author .fill_in .item .input input{
		width: 100%;height: 38px;border-radius: 50px;
			outline: none;border: 1px solid #ebebeb;
			padding-left: 15px;padding-right: 74px;
	}
	.author .fill_in .item .input:hover input{border: 1px solid #ff5f00;}
	.author .fill_in .item .input input:focus{border: 2px solid #ff5f00;}
	.author .fill_in .num{position: absolute;
		right: 0;width: 74px;text-align: center;top: 50%;
		transform: translateY(-50%);font-size: 14px;
		color: #a4a4a4;
	}
	.author .fill_in .apply{margin-left: 108px;cursor: pointer;
		padding-left: 36px;font-size: 14px;color: #a4a4a4;
		position: relative;
	}
	.author .fill_in .apply a{text-decoration: underline;
		color: #ff5f00;
	}
	.author .fill_in .apply .icon{position: absolute;width: 16px;height: 16px;
		top: 50%;transform: translateY(-50%);
		left: 10px;border: 1px solid #a4a4a4;
		border-radius: 3px;overflow: hidden;
	}
	.author .fill_in .apply .icon.on{
		border: 1px solid #ff5f00;
		background-image: url(/src/assets/images/dui.png);
		background-size: 100% 100%;
	}
	.c{clear: both;}
	
	
	.author .submit{text-align: center;margin-top: 60px;}
	.author .submit span{display: inline-block;
		background: linear-gradient(96deg, #ff9a62, #ff5f00), #ff5f00;
		width: 120px;height: 38px;line-height: 38px;cursor: pointer;
		border-radius: 50px;font-size: 14px;color: #fff;
	}
	
</style>