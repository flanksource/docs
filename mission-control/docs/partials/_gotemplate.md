<Details summary="Switching scripting language">

Use a shebang (`#!`) line to choose a different shell (`python`, `bash` and `pwsh` are included in the base image)

```yaml
exec:
    script: |
      //highlight-next-line
      #! pwsh
      Get-Items | ConvertTo-JSON
```

</Details>

<Details summary="Escaping templates in Helm Charts">

If you need to pass a template through a Helm Chart and prevent Helm from templating you need to escape it:

```
{{`{{ .secret }}`}}
```

Alternatively [change the templating delimiters](#changing-templating-delimiters)

</Details>

<Details summary="Multiline handling with YAML">

If you are using a YAML multiline string use `|` and not `>` which will strip newlines

Instead of:
```yaml
exec:
  //highlight-next-line
  script: >
    #! pwsh
    Get-Items | ConvertTo-JSON
```
Do this:
```yaml
exec:
  //highlight-next-line
  script: |
    #! pwsh
    Get-Items | ConvertTo-JSON
```
</Details>


<Details  summary="Changing templating delimiters">

The template delimiters can be changed from the defaults of `$()` and `{{}}` with `gotemplate` comments

```yaml
exec:
  script: |
    #! pwsh
    //highlight-next-line
    # gotemplate: left-delim=$[[ right-delim=]]
    $message = "$[[.config.name]]"
    Write-Host "{{  $message }}"
    Write-Host  @{ Number = 1; Shape = "Square"; Color = "Blue"} | ConvertTo-JSON
```
</Details>
