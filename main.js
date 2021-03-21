$(()=> {
  // get dom elem
  let $width = $('#width'),
      $height = $('#height'),
      $btnCal = $('#calc'),
      $perimeter = $('#perimeter'),
      $area = $('#area'),
      $widthValidate = $('#width-validate'),
      $heightValidate = $('#height-validate');
      //$form = $('#main');

  $width.keypress($width=>{
    isLegalKey($width.key,$width.target.value,$width.target.selectionStart) || $width.preventDefault()
  });

  $height.keypress($height=>{
    isLegalKey($height.key,$height.target.value,$height.target.selectionStart) || $height.preventDefault()
});

  $width.focusout(()=>{
    if(!validate($width,$widthValidate)) {
      $width.select();
    }
  })
  $height.focusout(()=>{
    if(!validate($height,$heightValidate)) {
      $height.select();
    }
  })


  //calc button click
  $btnCal.click(()=> {
    let w = Number($width.val()),
        h = Number($height.val());

    //validate  
  if(validate($width, $widthValidate) && validate($height, $heightValidate)){

    //calc
    let p = (w + h) * 2,
        a = w * h;

    //output
    $perimeter.val(p);
    $area.val(a);

    } 
  });
  //console.log('rectangle');
});

function validate(input, output) {

  // empty
  if(input.val() === ''){
    output.html('该字段不能为空');
    return false;
  } else {
    output.html('');
  }

  // is num
  let val = Number(input.val());
  //console.log(val);

  if(isNaN(val)){
    output.html("该字段应该是数值");
    return false;
  }else{
    output.html("");
  }

  // is >= 0 range
  if(val < 0) {
    output.html('该数值不能小于零');
    return false;
  }else{
    output.html('');
  }

  return true;
}

function isLegalKey(key, content, pos ) {
  // 过滤非法字符
  if(/[abcdf-zABCDF-Z`~!@#$%^&*()=_+[\]{}|;:'",<>/?\\]/.test(key)) {
    return false;
  }
  // 合法字符：. 小数点
  if(key === '.'){
    // 规则：小数点不能出现在数字的首位
    if(pos === 0)
      return false;

    // 规则：小数点不能出现在小数中
    if(content.indexOf('.') !== -1)
      return false;
    
    // 规则：小数点不能出现在负号以及 e 或 E 后面
    if(pos>0 && /[-eE]/.test(content.slice(0,pos)))
       return false;
  }
  
  // 合法字符：e 和 E 科学计数法指数符号
  if(key === 'e' || key === 'E') {
    // 规则：e 和 E 奴能出现在数字的首位
    if(pos === 0)
      return false;
 
    // 规则：e 和 E 不能出现在科学计数法的数字中
    if(content.indexOf('e') !==-1 || content.indexOf('E')!==-1)
      return false;

    // 规则： e 和 E 不能出现在负号和小数点后面
    if(pos > 0 && /[-.]/.test(content.slice(pos -1, pos)))
      return false;

    //规则：e 和 E 不能出现在小数点前面
    if(content.slice(pos,content.length).indexOf('.') !==-1)
      return false;
  }

  // 合法字符：- 负号
  if(key === '-') {
    // 规则：负号不能出现在数字的首位
    if(pos === 0)
      return false;

    // 规则：负号不能出现在数字和小数点后面
    if(pos > 0 && /[0-9.]/.test(content.slice(pos - 1, pos)))
      return false;

    // 规则：负号不能重复出现
    if(pos > 0 && content.indexOf('-') !== -1)
      return false;
  }
  return true;
}
